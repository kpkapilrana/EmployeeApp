import { DisplayColumn, IDisplayColumns, DisplayNumber } from '../shared/models/display-columns';

export const options = [
    { id: 'edit'},
    { id: 'delete'}
];
export const columnDefinition: Array<IDisplayColumns> = [
    new DisplayColumn('Id', 'id', 0.10),
    new DisplayColumn('Name', 'name', 0.10, true),
    new DisplayNumber('Phone', 'phone', 0.10),
    new DisplayColumn('City', 'city', 0.10),
    new DisplayColumn('Address 1', 'address_line1', 0.10),
    new DisplayColumn('Address 2', 'address_line2', 0.10),
    new DisplayColumn('Postal Code', 'postal_code', 0.10),
    { id: 'action', type: 'action'}
    // new ActionColumn(options)
];


export const PeriodicElement = [
    {id: 1, name: 'Hydrogen', phone: '123232133', city: 'H', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 2, name: 'Helium', phone: 'aaacsdcsdc', city: 'He', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 3, name: 'Lithium', phone: 6941, city: 'Li', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 4, name: 'Beryllium', phone: 9.0122, city: 'Be', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 5, name: 'Boron', phone: 10.811, city: 'B', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 6, name: 'Carbon', phone: 12.0107, city: 'C', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 7, name: 'Nitrogen', phone: 14.0067, city: 'N', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 8, name: 'Oxygen', phone: 15.9994, city: 'O', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 9, name: 'Fluorine', phone: 18.9984, city: 'F', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
    {id: 10, name: 'Neon', phone: 20.1797, city: 'Ne', address1: 'ABC', address2:'XYZ', postalCode:'43321'},
  ];