import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';


const sdk = new NodeSDK({
    serviceName: 'students-api-1',
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4317',
        compression: 'gzip'
    }),
    instrumentations: [getNodeAutoInstrumentations()]
})


process.on('beforeExit', async () => {
    await sdk.shutdown()
})

export const initalizeTracing = async () => {
    return sdk.start()
}