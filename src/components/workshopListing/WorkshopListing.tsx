import React, { useEffect, useState } from 'react';

interface Workshop {
    id: number;
    title: string;
    description: string;
    date: string;
}

const fetchMocks = async (): Promise<Workshop[]> => {
    return [
        {
            id: 1,
            title: 'Introdução à Ciência da Computação',
            description: 'Introdução à Ciência da Computação',
            date: '2023-09-01',
        },
        {
            id: 2,
            title: 'Fundamentos de Matemática',
            description: 'Fundamentos de Matemática',
            date: '2023-09-02',
        },
        {
            id: 3,
            title: 'Noções Básicas de Física',
            description: 'Noções Básicas de Física',
            date: '2023-09-03',
        },
    ];
};

const WorkshopListing: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);



    // useEffect(() => {
    //     const loadWorkshops = async () => {
    //         const data = await fetchWorkshops();
    //         setWorkshops(data);
    //     };

    //     loadWorkshops();
    // }, []);

    useEffect(() => {
        const loadMocks = async () => {
            const mocks = await fetchMocks();
            setWorkshops(mocks);
        };

        loadMocks();
    }, []);

    return (
        <div>
            <h1>Workshops</h1>
            <ul>
                {workshops.map((workshop) => (
                    <li key={workshop.id}>
                        <h2>{workshop.title}</h2>
                        <p>{workshop.description}</p>
                        <p>{workshop.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkshopListing;