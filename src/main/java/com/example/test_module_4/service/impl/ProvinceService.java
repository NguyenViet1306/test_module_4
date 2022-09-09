package com.example.test_module_4.service.impl;

import com.example.test_module_4.model.Province;
import com.example.test_module_4.repository.ProvinceRepository;
import com.example.test_module_4.service.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProvinceService implements IProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Optional<Province> findById(Long id) {
        return provinceRepository.findById(id);
    }

    @Override
    public Province save(Province province) {
        return provinceRepository.save(province);
    }

    @Override
    public void delete(Long id) {
        provinceRepository.deleteById(id);
    }
}
