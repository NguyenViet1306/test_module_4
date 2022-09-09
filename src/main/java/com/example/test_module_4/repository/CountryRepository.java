package com.example.test_module_4.repository;

import com.example.test_module_4.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
