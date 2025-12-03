package com.votaloya.services;
import com.votaloya.dto.request.CandidatoRequest;
import com.votaloya.entities.Candidato;
import com.votaloya.entities.Evento;
import com.votaloya.entities.Rol;
import com.votaloya.entities.Usuario;
import com.votaloya.repositories.CandidatoRepository;
import com.votaloya.repositories.EventoRepository;
import com.votaloya.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CandidatoService {
    private final CandidatoRepository candidatoRepository;
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Candidato crearCandidato(CandidatoRequest request, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden crear candidatos");
        }

        Evento evento = eventoRepository.findById(request.getEventoId())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Candidato candidato = Candidato.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .partido(request.getPartido())
                .avatarUrl(request.getAvatarUrl())
                .evento(evento)
                .build();

        return candidatoRepository.save(candidato);
    }

    @Transactional
    public Candidato editarCandidato(Long id, CandidatoRequest request, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden editar candidatos");
        }

        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        candidato.setNombre(request.getNombre());
        candidato.setDescripcion(request.getDescripcion());
        candidato.setPartido(request.getPartido());
        candidato.setAvatarUrl(request.getAvatarUrl());

        return candidatoRepository.save(candidato);
    }

    @Transactional
    public void eliminarCandidato(Long id, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden eliminar candidatos");
        }

        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        candidatoRepository.delete(candidato);
    }

    public List<Candidato> listarCandidatosPorEvento(Long eventoId) {
        return candidatoRepository.findByEventoId(eventoId);
    }
}
