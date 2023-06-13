import pandas as pd
import numpy as np
from faker import Faker
import time
from pandarallel import pandarallel

def main():
    fake = Faker('ja_JP')

    # ダミーデータ作成
    random_points = np.random.randint(0, 7000, (100000, 2))
    points = pd.DataFrame(random_points, columns=["X", "Y"])
    print(points)
    random_points = np.random.randint(0, 7000, (20, 2))
    points["INDEX"] = points.index
    rectangle = pd.DataFrame(random_points, columns=["X1", "Y1"])
    rectangle["WIDTH"] = np.random.randint(0, 100, rectangle.shape[0])
    rectangle["HEIGHT"] = np.random.randint(0, 100, rectangle.shape[0])
    rectangle["X2"] = rectangle["X1"] + rectangle["WIDTH"]
    rectangle["Y2"] = rectangle["Y1"] + rectangle["HEIGHT"]
    names = [fake.name() for i in range(len(rectangle))]
    rectangle["NAME"] = names


    backup_rectangle = rectangle.copy(deep=True)
    backup_points = points.copy(deep=True)

    # 高速化対応版の速度計測
    start = time.process_time()
    new_row = pd.DataFrame({'X1': [0], 'Y1': [0], 'WIDTH': [0], 'HEIGHT': [0], 'X2': [0], 'Y2': [0], 'NAME': [None]})
    rectangle = pd.concat([new_row, rectangle]).reset_index(drop=True)
    new_row = pd.DataFrame({'X1': [0], 'Y1': [0], 'WIDTH': [0], 'HEIGHT': [0], 'X2': [0], 'Y2': [0], 'NAME': [None]})
    rectangle = pd.concat([new_row, rectangle]).reset_index(drop=True)
    merged = pd.merge(points, rectangle, how="cross")
    merged["HIT"] = np.greater_equal(merged["X"].values, merged["X1"].values) & np.greater_equal(merged["X2"].values, merged["X"].values) & np.greater_equal(merged["Y"].values, merged["Y1"].values) & np.greater_equal(merged["Y2"].values,  merged ["Y"].values)
    merged = merged.sort_values(by=["INDEX", "HIT"], ascending=[True, False])
    merged = merged.drop_duplicates(subset=["INDEX"], keep="first")
    end = time.process_time()
    print(end-start)
    print(f'高速化対応後の実行時間: {end - start}')


    # apply版の速度計測
    rectangle = backup_rectangle.copy(deep=True)
    points = backup_points.copy(deep=True)

    def set_areas(row, areas):
        areas["hit"] = check_inside(areas["X1"].values, areas["X2"].values, areas["Y1"].values, areas["Y2"].values, row["X"], row["Y"])
        result = areas[areas["hit"] == True]
        if len(result) > 0:
            return result.iloc[0]["NAME"]
        else:
            return None

    def check_inside(x1, x2, y1, y2, px, py):
        return np.greater_equal(py, y1) & np.greater_equal(y2, py) & np.greater_equal(py, y1) & np.greater_equal(y2, py);

    pandarallel.initialize()
    start = time.process_time()
    points["NAME"] = points[["X", "Y"]].parallel_apply(set_areas, axis=1, args=(rectangle,))
    end = time.process_time()
    print(f'apply版の実行時間: {end - start}')

if __name__ == '__main__':
    main()