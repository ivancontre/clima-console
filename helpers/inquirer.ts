import { prompt, QuestionCollection } from 'inquirer';
import 'colors';
import { Place } from '../interfaces';

export const inquirerMenu = async (): Promise<number> => {

    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.white)
    console.log('===========================\n'.green);

    const questions: QuestionCollection = [
        {
            type: 'list',
            name: 'option',
            message: '¿Qué desea hacer?',
            choices: [ 
                {
                    value: 1,
                    name: `${'1.'.green} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.green} Historial`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ];
    
    const { option } = await prompt(questions);
    return option;
};

export const pause = async (): Promise<string> => {
    const questions: QuestionCollection = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    const { option } = await prompt(questions);
    return option;
};

export const readInput = async (message: string): Promise<string> => {

    const questions: QuestionCollection = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {

                if (value.trim().length === 0) {
                    return 'Por favor ingrese una descripción'
                }

                return true;
            }
        }
    ];

    const { description } = await prompt(questions);
    return description;
};

export const listPlaces = async (places = []): Promise<string> => {

    const choices = places.map((place: Place, index) => {

        return {
            value: place.id,
            name: `${((index + 1) + '.').green} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const questions: QuestionCollection = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ];

    const { id } = await prompt(questions);

    return id;

};