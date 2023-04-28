import React, {useMemo, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

interface IData {
    id: string;
    description: string;
    amountFormated: string;
    frequency: string;
    dataFormatada: string;
    tagColor: string;
}

const List: React.FC = () => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getUTCFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

    const { type } = useParams();
    const pageData = useMemo(() => {
        return type === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#F7931B',
                listData: gains
            } : {
                title: 'Saídas',
                lineColor: '#E44C4E',
                listData: expenses
            }
    },[type]);

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
        pageData.listData.forEach(item => {
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
    },[pageData.listData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);
        if(alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    }

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

    useEffect(() => {
        console.log(monthSelected);
        console.log(yearSelected);
        const filteredData = pageData.listData.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        let formattedData = filteredData.map((item, index) => {
            return {
                id: String(index),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatada: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(formattedData);
    },[pageData.listData, monthSelected, yearSelected, data.length, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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
            <Filters>
                <button type="button" className={`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`} onClick={() => handleFrequencyClick('recorrente')}>Recorrentes</button>
                <button type="button" className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`} onClick={() => handleFrequencyClick('eventual')}>Eventuais</button>
            </Filters>
            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dataFormatada}
                            amount={item.amountFormated}
                        />
                    ))
                }
                
            </Content>
        </Container>
    );
}

export default List;