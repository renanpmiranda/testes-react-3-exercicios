import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Pokecard from "../components/Pokecard";
import { pokemonMock } from "../tests/pokemonMock"

jest.mock("axios")

const pokemonUrlMock = "https://pokeapi.co/api/v2/pokemon/1/"

const openModalMock = jest.fn()

const axiosResponseMock = { 
    data: pokemonMock
 }  

describe("Pokecard", () => {
    test("deve renderizar o card com os elementos corretamente", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={pokemonUrlMock} openModal={openModalMock}/>)

        await waitFor(() => {})  
        
        const name = screen.getByRole('heading', {
            name: /bulbasaur/i
          })
        const image = screen.getByRole('img', {
            name: /bulbasaur/i
          })
        const firstType = screen.getByText(/grass/i)
        const secondType = screen.getByText(/poison/i)

        expect(name).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(firstType).toBeInTheDocument()
        expect(secondType).toBeInTheDocument()
    })

    test("deve chamar a função de abertura do modal ao clicar no card", async () => {
        const user = userEvent.setup()

        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={pokemonUrlMock} openModal={openModalMock}/>)

        await waitFor(() => {})
        
        const pokecard = screen.getByRole('article')

        await user.click(pokecard)
        expect(openModalMock).toBeCalledTimes(1)
    })
})