export const InputFormTypes: InputTypes[] = [

    {
        value: 'inital-last',
        description: 'Boleta (inicial ó final)',
        icon: 'assignment',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: true,
        chart_type: 'column'

    },
    {
        value: 'text',
        description: 'Respuesta Breve',
        icon: 'short_text',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: false,
    },
    {
        value: 'text-area',
        description: 'Párrafo',
        icon: 'notes',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: false
    },
    {
        value: 'radio',
        description: 'Opción Múltiple',
        icon: 'radio_button_checked',
        hasOptions: true,
        visibleOnList: true,
        use_for_counter: true,
        chart_type: 'bar'
    },
    {
        value: 'checkbox',
        description: 'Selección Múltiple',
        icon: 'check_box',
        hasOptions: true,
        visibleOnList: true,
        use_for_counter: false,
    },
    {
        value: 'date',
        description: 'Fecha',
        icon: 'event',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: false
    },
    {
        value: 'select',
        description: 'Lista Seleccionable',
        icon: 'list',
        hasOptions: true,
        visibleOnList: true,
        use_for_counter: true,
        chart_type: 'pie'
    },
    {
        value: 'location',
        description: 'Departamento - Municipio',
        icon: 'map',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: false
    },
    {
        value: 'boolean',
        description: 'SI/NO',
        icon: 'radio_button_checked',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: true,
        chart_type: 'pie'
    },
    {
        value: 'state',
        description: 'Departamento',
        icon: 'map',
        hasOptions: false,
        visibleOnList: false,
        use_for_counter: true,
        chart_type:'column'
    },
    {
        value: 'city',
        description: 'Municipio',
        icon: 'map',
        hasOptions: false,
        visibleOnList: false,
        use_for_counter: false
    },
    {
        value: 'number',
        description: 'Número',
        icon: 'looks_6',
        hasOptions: false,
        visibleOnList: true,
        use_for_counter: false
    },

]



export interface InputTypes {

    value: string;
    description: string;
    icon?: string;
    hasOptions: boolean;
    visibleOnList?: boolean;
    use_for_counter?: boolean;
    chart_type?: "bar" | "pie" | "column"

}