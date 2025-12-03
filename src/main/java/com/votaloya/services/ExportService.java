package com.votaloya.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.votaloya.dto.response.ResultadoVotacionDTO;
import com.votaloya.entities.Evento;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExportService {

    public String exportarResultadosCSV(Evento evento, List<ResultadoVotacionDTO> resultados) throws IOException {
        StringWriter out = new StringWriter();

        try (CSVPrinter printer = new CSVPrinter(out, CSVFormat.DEFAULT
                .withHeader("Candidato", "Partido", "Total Votos", "Porcentaje"))) {

            for (ResultadoVotacionDTO resultado : resultados) {
                printer.printRecord(
                    resultado.getNombreCandidato(),
                    resultado.getPartido(),
                    resultado.getTotalVotos(),
                    resultado.getPorcentaje() + "%"
                );
            }
        }

        return out.toString();
    }

    public byte[] exportarResultadosPDF(Evento evento, List<ResultadoVotacionDTO> resultados) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Título
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.DARK_GRAY);
            Paragraph title = new Paragraph("Resultados de Votación", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(10);
            document.add(title);

            // Información del evento
            Font infoFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            document.add(new Paragraph("Evento: " + evento.getNombre(), infoFont));
            document.add(new Paragraph("Descripción: " + evento.getDescripcion(), infoFont));

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            document.add(new Paragraph("Inicio: " + evento.getFechaInicio().format(formatter), infoFont));
            document.add(new Paragraph("Fin: " + evento.getFechaFin().format(formatter), infoFont));
            document.add(new Paragraph(" "));

            // Tabla de resultados
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            // Encabezados
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);
            PdfPCell cell;

            String[] headers = {"Candidato", "Partido", "Total Votos", "Porcentaje"};
            for (String header : headers) {
                cell = new PdfPCell(new Phrase(header, headerFont));
                cell.setBackgroundColor(BaseColor.DARK_GRAY);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(5);
                table.addCell(cell);
            }

            // Datos
            Font dataFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
            int totalVotos = resultados.stream().mapToInt(ResultadoVotacionDTO::getTotalVotos).sum();

            for (ResultadoVotacionDTO resultado : resultados) {
                table.addCell(new Phrase(resultado.getNombreCandidato(), dataFont));
                table.addCell(new Phrase(resultado.getPartido() != null ? resultado.getPartido() : "-", dataFont));
                table.addCell(new Phrase(String.valueOf(resultado.getTotalVotos()), dataFont));
                table.addCell(new Phrase(String.format("%.2f%%", resultado.getPorcentaje()), dataFont));
            }

            document.add(table);

            // Total de votos
            Paragraph total = new Paragraph("Total de votos emitidos: " + totalVotos,
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12));
            total.setAlignment(Element.ALIGN_RIGHT);
            document.add(total);

            // Ganador
            if (!resultados.isEmpty()) {
                ResultadoVotacionDTO ganador = resultados.get(0);
                Paragraph ganadorP = new Paragraph("\nGanador: " + ganador.getNombreCandidato() +
                        " con " + ganador.getTotalVotos() + " votos (" +
                        String.format("%.2f%%", ganador.getPorcentaje()) + ")",
                        FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLUE));
                ganadorP.setAlignment(Element.ALIGN_CENTER);
                ganadorP.setSpacingBefore(20);
                document.add(ganadorP);
            }

        } finally {
            document.close();
        }

        return out.toByteArray();
    }
}

