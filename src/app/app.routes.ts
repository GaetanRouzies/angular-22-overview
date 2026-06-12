import { Routes } from '@angular/router'

import { ServiceDecorator } from './1-service-decorator/service-decorator'
import { InjectAsync } from './2-inject-async/inject-async'
import { SignalForms } from './3-signal-forms/signal-forms'
import { AgentSkills } from './4-agent-skills/agent-skills'
import { TemplateImprovements } from './5-template-improvements/template-improvements'
import { DebouncedSignal } from './6-debounced-signal/debounced-signal'
import { Resources } from './7-resources/resources'
import { HttpFetchVsXhr } from './8-http-fetch-vs-xhr/http-fetch-vs-xhr'
import { OnPushDefault } from './9-onpush-default/onpush-default'

export const routes: Routes = [
  { path: 'service-decorator', component: ServiceDecorator },
  { path: 'inject-async', component: InjectAsync },
  { path: 'signal-forms', component: SignalForms },
  { path: 'agent-skills', component: AgentSkills },
  { path: 'template-improvements', component: TemplateImprovements },
  { path: 'debounced-signal', component: DebouncedSignal },
  { path: 'resources', component: Resources },
  { path: 'http-fetch-vs-xhr', component: HttpFetchVsXhr },
  { path: 'onpush-default', component: OnPushDefault },
  { path: '', redirectTo: '/service-decorator', pathMatch: 'full' },
]
