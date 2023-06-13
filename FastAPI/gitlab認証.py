import urllib.parse
import time
import requests
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2AuthorizationCodeBearer
import starlette.status as status

SECRET = ""
APP_ID = ""
REDIRECT_URI = urllib.parse.quote("http://localhost:4080/login")
REDIRECT_URI2 = urllib.parse.quote("http://localhost:4080/logged_in")
SCOPE="read_user"
app = FastAPI()



@app.get("/login")
async def login(request: Request):
    if not request.query_params:
        url = f"https://gitlab.com/oauth/authorize?client_id={APP_ID}&redirect_uri={REDIRECT_URI}&response_type=code&state=hoge" 
        return RedirectResponse(url=url)
    else:
        params = dict(request.query_params)
        print(params)
        code = params["code"]
        print(code)
        parameters=f"?client_id={APP_ID}&redirect_uri={REDIRECT_URI}&client_secret={SECRET}&code={code}&grant_type=authorization_code&state=hoge"
        url = "https://gitlab.com/oauth/token" + parameters
        print(url)
        ret = requests.post(url)
        token = ret.json()["access_token"]
        url = "https://gitlab.com/api/v4/user"
        ret = requests.get(url, headers={"Authorization": "Bearer " + token})
        print(ret.content)
        return ret.content
    