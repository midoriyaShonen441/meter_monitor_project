from http import server
import os
import asyncio
import aiohttp


class connection:
    def __init__(self, url):
        self.url = url

    async def upload(self, file):
        async with aiohttp.ClientSession() as session:
            async with session.post(self.url) as res:
                result = await res.json()
                print(result)


server = connection("http://localhost:3000/image/upload")
filepath = r"./img"
filenames = os.listdir(filepath)

for file in filenames:
    print(file)
    asyncio.run(server.upload(file))
    # file = {
    #     'file': (file, open(filepath, 'rb')),
    #     'Content-Type': 'image/png',
    #     'Content-Length': l
    # }
