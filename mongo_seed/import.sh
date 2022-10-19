#!/bin/sh

mongoimport --host db -u admin -p admin --db monitorDam --collection user_profiles --type json --file /mongo_seed/mock_data/users.json --jsonArray
mongoimport --host db -u admin -p admin --db monitorDam --collection meter_images --type json --file /mongo_seed/mock_data/images.json --jsonArray