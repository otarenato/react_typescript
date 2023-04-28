import React from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import { Container } from './styles';

const Dashboard: React.FC = () => {
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
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options} onChange={(e) => {}}></SelectInput>
                <SelectInput options={options2} onChange={(e) => {}}></SelectInput>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;