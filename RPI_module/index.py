import os
import asyncio
import aiohttp


class connection:
    def __init__(self, url):
        self.url = url

    async def upload(file):
        async with aiohttp.ClientSession() as session:
            async with session.post(self.url) as res:
                result = await res.json()
                print(result)



# connection = connection("http://localhost")
filepath = r"./img"
filenames = os.listdir(filepath)

for file in filenames:
    asyncio.run(connection.upload(file))
    # file = {
    #     'file': (file, open(filepath, 'rb')),
    #     'Content-Type': 'image/png',
    #     'Content-Length': l
    # }
