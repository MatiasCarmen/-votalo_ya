package com.votaloya.services;
import com.votaloya.dto.request.EventoRequest;
import com.votaloya.dto.response.ResultadoVotacionDTO;
import com.votaloya.entities.Evento;
import com.votaloya.entities.Rol;
import com.votaloya.entities.Usuario;
import com.votaloya.entities.Voto;
import com.votaloya.repositories.EventoRepository;
import com.votaloya.repositories.UsuarioRepository;
import com.votaloya.repositories.VotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class EventoService {
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final VotoRepository votoRepository;
    private final ExportService exportService;

    @Transactional
    public Evento crearEvento(EventoRequest request, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden crear eventos");
        }

        Evento evento = Evento.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .fechaInicio(LocalDateTime.parse(request.getFechaInicio()))
                .fechaFin(LocalDateTime.parse(request.getFechaFin()))
                .activo(true)
                .creador(admin)
                .build();

        return eventoRepository.save(evento);
    }

    public List<Evento> listarEventosActivos() {
        return eventoRepository.findByActivoTrue();
    }

    public List<Evento> listarTodosEventos() {
        return eventoRepository.findAll();
    }

    public Evento obtenerEvento(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    @Transactional
    public Evento editarEvento(Long id, EventoRequest request, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden editar eventos");
        }

        Evento evento = obtenerEvento(id);
        evento.setNombre(request.getNombre());
        evento.setDescripcion(request.getDescripcion());
        evento.setFechaInicio(LocalDateTime.parse(request.getFechaInicio()));
        evento.setFechaFin(LocalDateTime.parse(request.getFechaFin()));

        return eventoRepository.save(evento);
    }

    @Transactional
    public void eliminarEvento(Long id, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden eliminar eventos");
        }

        Evento evento = obtenerEvento(id);
        eventoRepository.delete(evento);
    }

    @Transactional
    public Evento desactivarEvento(Long id, String dni) {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden desactivar eventos");
        }

        Evento evento = obtenerEvento(id);
        evento.setActivo(false);
        return eventoRepository.save(evento);
    }

    @Transactional
    public List<ResultadoVotacionDTO> obtenerResultados(Long eventoId, String dni) {
        // Si se proporciona DNI, verificar que sea administrador
        if (dni != null) {
            Usuario admin = usuarioRepository.findByDni(dni)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (admin.getRol() != Rol.ADMINISTRADOR) {
                throw new RuntimeException("Solo los administradores pueden ver resultados");
            }
        }

        Evento evento = obtenerEvento(eventoId);
        List<Voto> votos = votoRepository.findByEventoId(eventoId);
        int totalVotos = votos.size();

        Map<Long, List<Voto>> votosPorCandidato = votos.stream()
                .collect(Collectors.groupingBy(v -> v.getCandidato().getId()));

        return evento.getCandidatos().stream()
                .map(candidato -> {
                    int votosC = votosPorCandidato.getOrDefault(candidato.getId(), List.of()).size();
                    double porcentaje = totalVotos > 0 ? (votosC * 100.0 / totalVotos) : 0.0;

                    return new ResultadoVotacionDTO(
                            candidato.getId(),
                            candidato.getNombre(),
                            candidato.getPartido(),
                            votosC,
                            Math.round(porcentaje * 100.0) / 100.0
                    );
                })
                .sorted((a, b) -> b.getTotalVotos().compareTo(a.getTotalVotos()))
                .collect(Collectors.toList());
    }

    public String exportarResultadosCSV(Long eventoId, String dni) throws Exception {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden exportar resultados");
        }

        Evento evento = obtenerEvento(eventoId);
        List<ResultadoVotacionDTO> resultados = obtenerResultados(eventoId, dni);

        return exportService.exportarResultadosCSV(evento, resultados);
    }

    public byte[] exportarResultadosPDF(Long eventoId, String dni) throws Exception {
        Usuario admin = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (admin.getRol() != Rol.ADMINISTRADOR) {
            throw new RuntimeException("Solo los administradores pueden exportar resultados");
        }

        Evento evento = obtenerEvento(eventoId);
        List<ResultadoVotacionDTO> resultados = obtenerResultados(eventoId, dni);

        return exportService.exportarResultadosPDF(evento, resultados);
    }
}
