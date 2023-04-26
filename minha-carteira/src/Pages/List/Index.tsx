import React from "react";
import { Container } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const List: React.FC = () => {
    const options = [
        { value: 'Renato', label: 'Renato' },
        {value: 'Teste', label: 'Teste' }
    ]

    const options2 = [
        { value: 'a', label: 'aa' },
        {value: 'bb', label: 'bb' }
    ]
    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={options}></SelectInput>
                <SelectInput options={options2}></SelectInput>
            </ContentHeader>
        </Container>
    );
}

export default List;