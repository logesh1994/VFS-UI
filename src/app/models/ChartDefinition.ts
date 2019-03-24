export class ChartDefinition {
    name: string;
    type: string;
    data: ChartDefDataSet;
    options: any
}
export class ChartDefDataSet {
    label: string;
    data: any[];
    backgroundColor: any[]
}
export class ChartDefData {
        labels: string[];
        datasets: ChartDefDataSet []
}