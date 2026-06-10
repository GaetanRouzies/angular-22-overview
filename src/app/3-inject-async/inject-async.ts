import { Component, inject, injectAsync, onIdle, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductStoreService } from '../2-service-decorator/product-store-service'

@Component({
  selector: 'app-inject-async',
  templateUrl: './inject-async.html',
})
export class InjectAsync {
  productStoreService = inject(ProductStoreService)

  asyncPdfGeneratorService = injectAsync(
    () => import('./pdf-generator-service').then((m) => m.PdfGeneratorService),
    { prefetch: onIdle },
  )

  asyncCsvExporterService = injectAsync(() =>
    import('./csv-exporter-service').then((m) => m.CsvExporterService),
  )

  lastInvoice = signal<string>('')
  lastCsv = signal<string>('')

  async generateInvoice() {
    const pdfGeneratorService = await this.asyncPdfGeneratorService()
    this.lastInvoice.set(pdfGeneratorService.generateInvoice(this.productStoreService.products()))
  }

  async exportCsv() {
    const csvExporterService = await this.asyncCsvExporterService()
    this.lastCsv.set(csvExporterService.toCsv(this.productStoreService.products()))
  }
}
