import googlemaps
import pandas as pd
from tqdm import tqdm
import time

gmaps = googlemaps.Client(key="AIzaSyCQg-z8wy8TcOHC7EjlhM6yEWoyLDHsLwc")  # 請確保您有設定 api_key

sw = (24.128288, 120.668001)
ne = (24.156484, 120.690059)
step = 0.011
radius = 1000

columns = ['Name', 'Address','Latitude', 'Longitude','Rating']
df = pd.DataFrame(columns=columns)

lat_steps = int((ne[0] - sw[0]) / step)
lng_steps = int((ne[1] - sw[1]) / step)

for i in tqdm(range(lat_steps)):
    lat = sw[0] + i * step
    for j in range(lng_steps):
        lng = sw[1] + j * step

        places_result = gmaps.places_nearby(location=(lat, lng), radius=radius, keyword='bar')

        if 'results' in places_result:
            for place in places_result['results']:
                name = place['name']
                address = place['vicinity']
                latitude = place['geometry']['location']['lat']
                longitude = place['geometry']['location']['lng']		
                rating = place.get('rating', 'N/A')
		
                df = pd.concat([df, pd.DataFrame(
                    {'Name': [name], 'Address': [address], 'Latitude': [latitude], 'Longitude': [longitude], 'Rating': [rating]})], ignore_index=True)
        time.sleep(0.2)

df.drop_duplicates(subset=['Name', 'Address', 'Latitude', 'Longitude'], keep='first', inplace=True)
print(df)
df.to_excel("clinic.xlsx",sheet_name='酒吧',index=False)
