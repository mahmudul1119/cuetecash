package com.cuetecash.services;

import com.cuetecash.dto.SemesterFeeDTO;
import com.cuetecash.models.SemesterFee;
import com.cuetecash.models.Officer;
import com.cuetecash.repositories.SemesterFeeRepository;
import com.cuetecash.repositories.OfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SemesterFeeService {

    @Autowired
    private SemesterFeeRepository semesterFeeRepository;

    @Autowired
    private OfficerRepository officerRepository;

    public List<SemesterFeeDTO> getAllSemesterFees() {
        List<SemesterFee> semesterFees = semesterFeeRepository.findAllByIsActiveTrueOrderByDeadlineDesc();
        return semesterFees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SemesterFeeDTO createSemesterFee(SemesterFeeDTO semesterFeeDTO, String officerEmail) {
        SemesterFee semesterFee = new SemesterFee();
        semesterFee.setSemesterID(semesterFeeDTO.getSemesterID());
        semesterFee.setBatchNO(semesterFeeDTO.getBatchNO());
        semesterFee.setDepartment(semesterFeeDTO.getDepartment());
        semesterFee.setSemesterFee(semesterFeeDTO.getSemesterFee());
        semesterFee.setDeadline(semesterFeeDTO.getDeadline());
        semesterFee.setLateFine(semesterFeeDTO.getLateFine());
        semesterFee.setIsActive(true);

        // Find officer by email
        Optional<Officer> officer = officerRepository.findByUserEmail(officerEmail);
        if (officer.isPresent()) {
            semesterFee.setOfficer(officer.get());
        }

        SemesterFee savedSemesterFee = semesterFeeRepository.save(semesterFee);
        return convertToDTO(savedSemesterFee);
    }

    public SemesterFeeDTO updateSemesterFee(Long semesterFeeId, SemesterFeeDTO semesterFeeDTO) {
        Optional<SemesterFee> optionalSemesterFee = semesterFeeRepository.findById(semesterFeeId);
        if (optionalSemesterFee.isPresent()) {
            SemesterFee semesterFee = optionalSemesterFee.get();
            semesterFee.setSemesterID(semesterFeeDTO.getSemesterID());
            semesterFee.setBatchNO(semesterFeeDTO.getBatchNO());
            semesterFee.setDepartment(semesterFeeDTO.getDepartment());
            semesterFee.setSemesterFee(semesterFeeDTO.getSemesterFee());
            semesterFee.setDeadline(semesterFeeDTO.getDeadline());
            semesterFee.setLateFine(semesterFeeDTO.getLateFine());
            semesterFee.setUpdatedAt(LocalDateTime.now());

            SemesterFee updatedSemesterFee = semesterFeeRepository.save(semesterFee);
            return convertToDTO(updatedSemesterFee);
        }
        return null;
    }

    public boolean deleteSemesterFee(Long semesterFeeId) {
        Optional<SemesterFee> optionalSemesterFee = semesterFeeRepository.findById(semesterFeeId);
        if (optionalSemesterFee.isPresent()) {
            SemesterFee semesterFee = optionalSemesterFee.get();
            semesterFee.setIsActive(false);
            semesterFeeRepository.save(semesterFee);
            return true;
        }
        return false;
    }

    public SemesterFeeDTO getSemesterFeeById(Long semesterFeeId) {
        Optional<SemesterFee> optionalSemesterFee = semesterFeeRepository.findById(semesterFeeId);
        return optionalSemesterFee.map(this::convertToDTO).orElse(null);
    }

    private SemesterFeeDTO convertToDTO(SemesterFee semesterFee) {
        SemesterFeeDTO dto = new SemesterFeeDTO();
        dto.setId(semesterFee.getSemesterFeeID());
        dto.setSemesterID(semesterFee.getSemesterID());
        dto.setBatchNO(semesterFee.getBatchNO());
        dto.setDepartment(semesterFee.getDepartment());
        dto.setSemesterFee(semesterFee.getSemesterFee());
        dto.setDeadline(semesterFee.getDeadline());
        dto.setLateFine(semesterFee.getLateFine());
        dto.setIsActive(semesterFee.getIsActive());
        
        if (semesterFee.getOfficer() != null) {
            dto.setPostedBy(semesterFee.getOfficer().getFullName());
        } else {
            dto.setPostedBy("System Admin");
        }
        
        return dto;
    }
} 