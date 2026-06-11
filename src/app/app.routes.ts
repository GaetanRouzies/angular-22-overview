import { Routes } from '@angular/router'

import { ServiceDecorator } from './1-service-decorator/service-decorator'
import { InjectAsync } from './2-inject-async/inject-async'
import { HttpFetchVsXhr } from './3-http-fetch-vs-xhr/http-fetch-vs-xhr'
import { TemplateImprovements } from './4-template-improvements/template-improvements'
import { DebouncedSignal } from './5-debounced-signal/debounced-signal'
import { Resources } from './6-resources/resources'
import { AgentSkills } from './7-agent-skills/agent-skills'
import { OnPushDefault } from './8-onpush-default/onpush-default'
import { SignalForms } from './9-signal-forms/signal-forms'

export const routes: Routes = [
  { path: 'service-decorator', component: ServiceDecorator },
  { path: 'inject-async', component: InjectAsync },
  { path: 'http-fetch-vs-xhr', component: HttpFetchVsXhr },
  { path: 'template-improvements', component: TemplateImprovements },
  { path: 'debounced-signal', component: DebouncedSignal },
  { path: 'resources', component: Resources },
  { path: 'agent-skills', component: AgentSkills },
  { path: 'onpush-default', component: OnPushDefault },
  { path: 'signal-forms', component: SignalForms },
  { path: '', redirectTo: '/service-decorator', pathMatch: 'full' },
]
