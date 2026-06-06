import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

interface FeatureGroup {
  title: string
  description: string
  items: { name: string; detail: string }[]
}

@Component({
  selector: 'app-ai-features',
  imports: [CommonModule],
  templateUrl: './ai-features.html',
})
export class AiFeatures {
  groups: FeatureGroup[] = [
    {
      title: 'Angular MCP Server - new tools',
      description:
        'The Model Context Protocol server gained new tools so AI agents can drive Angular dev workflows.',
      items: [
        {
          name: 'devserver.start / devserver.stop',
          detail: 'Lifecycle control of the development server from an agent.',
        },
        {
          name: 'devserver.wait_for_build',
          detail: 'Lets agents trigger a build and review compiler output before responding.',
        },
        { name: 'ai_tutor', detail: 'Conversational learning assistant for Angular APIs.' },
        { name: 'modernize', detail: 'Suggests migrations to modern Angular patterns.' },
        {
          name: 'onpush_zoneless_migration',
          detail: 'Guides apps toward the new OnPush + zoneless defaults.',
        },
      ],
    },
    {
      title: 'Angular Agent Skills',
      description:
        'Skills package up best practices and step-by-step guidance for agentic environments.',
      items: [
        {
          name: 'angular-developer',
          detail: 'Critical best practices for writing modern Angular applications.',
        },
        {
          name: 'angular-new-app',
          detail: 'Guides first-time setup in agentic environments.',
        },
      ],
    },
    {
      title: 'WebMCP (Experimental)',
      description:
        'WebMCP exposes structured tools an agent can call directly from the running browser app.',
      items: [
        {
          name: 'declareExperimentalWebMcpTool',
          detail:
            'Declare a tool from a component or service so agents can call it on the live page.',
        },
        {
          name: 'provideExperimentalWebMcpTools',
          detail: 'Bootstrap WebMCP at the app level.',
        },
        {
          name: 'provideExperimentalWebMcpForms',
          detail: 'Integration with Signal Forms to let agents fill and submit forms.',
        },
      ],
    },
  ]
}
