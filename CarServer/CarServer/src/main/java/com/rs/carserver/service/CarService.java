package com.rs.carserver.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.rs.carserver.CarDAO;
import com.rs.carserver.model.Car;

@Service
public class CarService {
	@Autowired
	CarDAO carRepository;
	
	public List<Car> getAllCars() {
		// TODO Auto-generated method stub
		return carRepository.findAll();
	}


	public Car getCarById(int id) {
		// TODO Auto-generated method stub
		return carRepository.findById(id).get();
	}


	public Car createCar(Car car) {
		// TODO Auto-generated method stub
		return carRepository.save(car);
	}


	public Car save(Car car) {
		// TODO Auto-generated method stub
		return carRepository.save(car);
	}

	public Car createCar1(Car car) {
		// TODO Auto-generated method stub
		return carRepository.save(car);
	}

		public boolean deleteCar(int id) {
	        // TODO Auto-generated method stub
	        if(carRepository.existsById(id)) {
	        	carRepository.deleteById(id);
	            return true;
	        }else {
	            return false;
	        }
	    }

}
