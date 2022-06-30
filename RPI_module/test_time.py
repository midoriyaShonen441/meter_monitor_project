import pytz
import datetime

TZ = pytz.timezone("Asia/Bangkok")
my_date = datetime.datetime.now(TZ)
print(my_date.isoformat())