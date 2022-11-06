from http import server
import os
import asyncio
import aiohttp


class connection:
    def __init__(self, url):
        self.url = url

    async def upload(self, file):
        url = self.url + "/backend/image/upload"
        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=file) as res:
                result = await res.text()
                print(result)

    async def test_debug(self):
        url = self.url + "/"
        async with aiohttp.ClientSession() as session:
            async with session.get(self.url) as res:
                result = await res.text()
                print(result)


server = connection("http://localhost") # edit url for hosting server end-point
file_path = r"./img/"
file_names = os.listdir(file_path)

for file_name in file_names:
    datetime = file_name.split("_")[-1].split(".")[0]
    file = file_path + file_name
    data = aiohttp.FormData()
    print(file)
    data.add_field('file',
                   open(file, 'rb'),
                   filename=file_name,
                   content_type='image/png')
    data.add_field('date', datetime)
    print("=======================================")
    asyncio.run(server.upload(data))
