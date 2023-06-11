import pandas as pd
import numpy as np
from faker import Faker
import time

fake = Faker('ja_JP')

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
new_row = pd.DataFrame({'X1': [0], 'Y1': [0], 'WIDTH': [0], 'HEIGHT': [0], 'X2': [0], 'Y2': [0], 'NAME': [None]})
rectangle = pd.concat([new_row, rectangle]).reset_index(drop=True)

start = time.process_time()
new_row = pd.DataFrame({'X1': [0], 'Y1': [0], 'WIDTH': [0], 'HEIGHT': [0], 'X2': [0], 'Y2': [0], 'NAME': [None]})
rectangle = pd.concat([new_row, rectangle]).reset_index(drop=True)
merged = pd.merge(points, rectangle, how="cross")
merged["HIT"] = np.greater_equal(merged["X"].values, merged["X1"].values) & np.greater_equal(merged["X2"].values, merged["X"].values) & np.greater_equal(merged["Y"].values, merged["Y1"].values) & np.greater_equal(merged["Y2"].values,  merged ["Y"].values)
merged = merged.sort_values(by=["INDEX", "HIT"], ascending=[True, False])
merged = merged.drop_duplicates(subset=["INDEX"], keep="first")
end = time.process_time()
print(end-start)
print(merged)
merged.to_csv('results.csv', encoding='utf_8_sig', columns=["X", "Y", "NAME"] )


