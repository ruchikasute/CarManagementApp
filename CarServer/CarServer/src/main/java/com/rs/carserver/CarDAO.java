package com.rs.carserver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rs.carserver.model.Car;


@Repository
public interface CarDAO extends JpaRepository<Car,Integer>{

}