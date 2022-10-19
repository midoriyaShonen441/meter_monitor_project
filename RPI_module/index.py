from http import server
import os
import asyncio
import aiohttp


class connection:
    def __init__(self, url):
        self.url = url

    async def upload(self, file):
        url = self.url + "/image/upload"
        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=file) as res:
                result = await res.text()
                print(result)

    # async def upload(self, file):
    #     url = self.url + "/image/upload"
    #     with open(file, "rb") as f:
    #         print(f)
            # async with aiohttp.ClientSession() as session:
            #     async with session.post(url, data=f) as res:
            #         print(await res.text())

    async def test_debug(self):
        url = self.url + "/"
        async with aiohttp.ClientSession() as session:
            async with session.get(self.url) as res:
                result = await res.text()
                print(result)


server = connection("http://localhost:3000")
file_path = r"./img/"
file_names = os.listdir(file_path)

for file_name in file_names:
    file = file_path + file_name
    data = aiohttp.FormData()
    data.add_field('file',
                   open(file, 'rb'),
                   filename=file_name,
                   content_type='image/png')
    # server.upload(data)
#     files = {
#         'file': open(file, 'rb'),
#         'filename': file_name,
#         'path': file
#     }
# print(files)
    asyncio.run(server.upload(data))
