import React, {useMemo} from "react";
import CountUp from 'react-countup';

import { Container } from "./styles";

import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) => {
    const iconSelected = useMemo(() => {
        if(icon === 'dolar')
            return dollarImg;
        if(icon === 'arrowUp')
            return arrowUpImg;
        if(icon === 'arrowDown')
            return arrowDownImg;
    },[icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp end={amount} separator="." decimal="," decimals={2} />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    )
}

export default WalletBox;