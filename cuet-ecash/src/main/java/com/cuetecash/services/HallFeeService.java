package com.cuetecash.services;

import com.cuetecash.dto.HallFeeDTO;
import com.cuetecash.models.HallFee;
import com.cuetecash.models.Officer;
import com.cuetecash.repositories.HallFeeRepository;
import com.cuetecash.repositories.OfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HallFeeService {

    @Autowired
    private HallFeeRepository hallFeeRepository;

    @Autowired
    private OfficerRepository officerRepository;

    public List<HallFeeDTO> getAllHallFees() {
        List<HallFee> hallFees = hallFeeRepository.findAllByIsActiveTrueOrderByDeadlineDesc();
        return hallFees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public HallFeeDTO createHallFee(HallFeeDTO hallFeeDTO, String officerEmail) {
        HallFee hallFee = new HallFee();
        hallFee.setSemesterID(hallFeeDTO.getSemesterID());
        hallFee.setBatchNO(hallFeeDTO.getBatchNO());
        hallFee.setHallId(hallFeeDTO.getHallId());  // Set hallId directly (like department)
        hallFee.setHFee(hallFeeDTO.getHFee());
        hallFee.setDeadline(hallFeeDTO.getDeadline());
        hallFee.setLateFine(hallFeeDTO.getLateFine());
        hallFee.setIsActive(true);

        // Find officer by email (same as SemesterFeeService)
        Optional<Officer> officer = officerRepository.findByUserEmail(officerEmail);
        if (officer.isPresent()) {
            hallFee.setOfficer(officer.get());
        }

        HallFee savedHallFee = hallFeeRepository.save(hallFee);
        return convertToDTO(savedHallFee);
    }

    public HallFeeDTO updateHallFee(Long hallFeeId, HallFeeDTO hallFeeDTO) {
        Optional<HallFee> optionalHallFee = hallFeeRepository.findById(hallFeeId);
        if (optionalHallFee.isPresent()) {
            HallFee hallFee = optionalHallFee.get();
            hallFee.setSemesterID(hallFeeDTO.getSemesterID());
            hallFee.setBatchNO(hallFeeDTO.getBatchNO());
            hallFee.setHallId(hallFeeDTO.getHallId());  // Set hallId directly
            hallFee.setHFee(hallFeeDTO.getHFee());
            hallFee.setDeadline(hallFeeDTO.getDeadline());
            hallFee.setLateFine(hallFeeDTO.getLateFine());
            hallFee.setUpdatedAt(LocalDateTime.now());

            HallFee updatedHallFee = hallFeeRepository.save(hallFee);
            return convertToDTO(updatedHallFee);
        }
        return null;
    }

    public boolean deleteHallFee(Long hallFeeId) {
        Optional<HallFee> optionalHallFee = hallFeeRepository.findById(hallFeeId);
        if (optionalHallFee.isPresent()) {
            HallFee hallFee = optionalHallFee.get();
            hallFee.setIsActive(false);
            hallFeeRepository.save(hallFee);
            return true;
        }
        return false;
    }

    public HallFeeDTO getHallFeeById(Long hallFeeId) {
        Optional<HallFee> optionalHallFee = hallFeeRepository.findById(hallFeeId);
        return optionalHallFee.map(this::convertToDTO).orElse(null);
    }

    private HallFeeDTO convertToDTO(HallFee hallFee) {
        HallFeeDTO dto = new HallFeeDTO();
        dto.setId(hallFee.getHallFeeID());
        dto.setSemesterID(hallFee.getSemesterID());
        dto.setBatchNO(hallFee.getBatchNO());
        dto.setHallId(hallFee.getHallId());  // Get hallId directly (like department)
        dto.setHFee(hallFee.getHFee());
        dto.setDeadline(hallFee.getDeadline());
        dto.setLateFine(hallFee.getLateFine());
        dto.setIsActive(hallFee.getIsActive());
        
        // Set hall name (you'll need to fetch this separately or add it to the model)
        dto.setHallName("Hall " + hallFee.getHallId());  // Simple fallback
        
        if (hallFee.getOfficer() != null) {
            dto.setPostedBy(hallFee.getOfficer().getFullName());
        } else {
            dto.setPostedBy("System Admin");
        }
        
        return dto;
    }
} 