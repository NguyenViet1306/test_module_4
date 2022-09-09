package com.example.test_module_4.controller;

import com.example.test_module_4.model.Country;
import com.example.test_module_4.model.Province;
import com.example.test_module_4.service.ICountryService;
import com.example.test_module_4.service.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/provinces")
public class ProvinceController {
    @Autowired
    private IProvinceService iProvinceService;

    @Autowired
    private ICountryService iCountryService;

    @GetMapping
    public ResponseEntity<List<Province>> findAll( ) {
        return new ResponseEntity<>(iProvinceService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> findById(@PathVariable Long id) {
        Optional<Province> optionalProvince = iProvinceService.findById(id);
        if (optionalProvince.isPresent()){
            return new ResponseEntity<>(optionalProvince.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Province> save(@RequestBody Province province){
        return new ResponseEntity<>(iProvinceService.save(province), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> update(@PathVariable Long id, @RequestBody Province province){
        Optional<Province> optionalProvince = iProvinceService.findById(id);
        if (optionalProvince.isPresent()){
            return new ResponseEntity<>(iProvinceService.save(province), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Province> deleteById(@PathVariable Long id) {
        iProvinceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/country")
    public ResponseEntity<List<Country>> findAllCountry() {
        return new ResponseEntity<>(iCountryService.findAll(), HttpStatus.OK);
    }

}
