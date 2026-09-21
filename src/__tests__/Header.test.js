import react from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Header from '../components/Header';


describe('Componente Header', () => {
    it('Renderiza el Titulo de la APP', () => {
        renderWithProviders(<Header />);

        const title = screen.getByText(/biblioteca musical/i);
        expect(title).toBeInTheDocument();
    });

    it('Renderiza el Subtitulo de la APP', () => {
        renderWithProviders(<Header />);

        const subtitle = screen.getByText(/descubre y guarda tus canciones favoritas/i);
        expect(subtitle).toBeInTheDocument();
    });

    it('Renderiza el Emoji del Titulo', () => {
        renderWithProviders(<Header />);

        // El título incluye el emoji 🎵. Lo verificamos con una regex flexible.
        const title = screen.getByRole('heading', { level: 1 });
        expect(title).toHaveTextContent('🎵');
        expect(title).toHaveTextContent(/biblioteca musical/i);
    });

    it('NO Muestra Contenido Adicional Inesperado', () => {
        renderWithProviders(<Header />);

        // Verificamos que solo hay un h1 y un párrafo (subtítulo)
        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(1);

        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs).toHaveLength(1);
    });
});