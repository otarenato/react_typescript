import React, {useState, useMemo} from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';
import WalletBox from "../../components/WalletBox";

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getUTCFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    },[]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch(error) {
            throw new Error('invalid month value');
        }
    }

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch(error) {
            throw new Error('invalid year value');
        }
    }
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}
                    />
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}
                    />
            </ContentHeader>
            <Content>
                <WalletBox title="Saldo" color="#4E41F0" amount={150.00} footerLabel="atualizado com base nas entradas e saídas" icon="dolar" />
                <WalletBox title="Entradas" color="#F7931B" amount={5000.00} footerLabel="atualizado com base nas entradas e saídas" icon="arrowDown" />
                <WalletBox title="Saídas" color="#E44C4E" amount={4850.00} footerLabel="atualizado com base nas entradas e saídas" icon="arrowUp" />
            </Content>
        </Container>
    );
}

export default Dashboard;