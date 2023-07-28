package com.rs.carserver.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rs.carserver.model.Car;
import com.rs.carserver.service.CarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")

public class CarController {
	
	@Autowired
	CarService carService;
	
	@GetMapping("/hello")
	public String sayHello() {
		return ("Hello Universe");
	}
	// SELECT
	@GetMapping("/cars")
	public List<Car> getAllCars()
	{
		return carService.getAllCars();
	}
	
	@GetMapping("/cars/{id}")
	public Car getCarById1(@PathVariable int id) {
		return carService.getCarById(id);	
		
	}
	//INSERT
	
	@PostMapping("/cars")
	public Car createCar(@RequestBody Car car) {
		return carService.createCar(car);
	}
	

	//UPDATE
	@PutMapping("/cars/{id}")
	public Car updateCar(@RequestBody Car car,@PathVariable int id) {
		Car existCar = carService.getCarById(id);
		carService.save(car);
		return new Car();
	}

	@DeleteMapping("/cars/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable int id) {
        boolean isDeleted = carService.deleteCar(id);
        if (isDeleted) {
            return new ResponseEntity<>("Car with ID " + id + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Car with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
	
}

