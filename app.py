from flask import Flask, jsonify, request,render_template
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
cors = CORS(app,resources={r"/*": {"origins": "*"}})

model = pickle.load(open('ml_model.pkl', 'rb'))
car = pd.read_csv('cleaned_data.csv')
car['year'] = car['year'].astype(object)
car['kms_driven'] = car['kms_driven'].astype(object)

@app.route('/', methods=['GET'])
def index():
    company = []
    for c in sorted(car['company'].unique()):
        company.append(c)
    car_models = []
    for cm in sorted(car['name'].unique()):
        car_models.append(cm)
        
    year = []
    for cs in sorted(car['year'].unique()):
        year.append(cs)
        
    fuel_type = []
    for cn in car['fuel_type'].unique():
        fuel_type.append(cn)
        
    kms_driven = []
    for cn in car['kms_driven'].unique():
        kms_driven.append(cn)    
        
    company.insert(0,'Select Company') ; 
    car_models.insert(0,'Select Models') 
    year.insert(0,'year')
    fuel_type.insert(0,'type')
    kms_driven.insert(0,'kms')
    
    data={
        'company': company,  
        'car_models': car_models,
        'year': year,
        'fuel_type': fuel_type,
        'kms_driven': kms_driven
        
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    company = data.get('c_name')
    car_model = data.get('c_model')
    year = int(data.get('c_year'))
    fuel_type = data.get('c_fuel')
    driven = int(data.get('c_kms')) 
    print(data)
    prediction = model.predict(pd.DataFrame(columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'],
                                             data=np.array([car_model, company, year, driven, fuel_type]).reshape(1, 5)))
    print(prediction)
    p = (np.round(prediction[0], 2))
    return jsonify({"prediction":p})

if __name__ == '__main__':
    app.run(debug=True)
