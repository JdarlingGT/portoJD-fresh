# Hep AI Assistant Phase 2

## Overview

This phase enhances Hep's capabilities with visual fetch cards, IU Playbook analogies, and Hoosier Heritage knowledge.

## New Features

1. **Visual Fetch Cards**
   - Hep can render interactive cards with project visuals and descriptions.
   - Cards include thumbnails, titles, descriptions, and CTA buttons.

2. **IU Playbook Mode**
   - Hep uses IU sports analogies to explain marketing strategies.
   - Analogies are drawn from basketball, football, and leadership.

3. **Hoosier Heritage Knowledge**
   - Hep references famous IU alumni and their lessons in responses.

## Developer Setup

1. **Fetch Cards**
   - Implemented in `FetchCard.tsx`.
   - Data sourced from `toolbox.json`.

2. **IU Playbook and Heritage**
   - Expanded in `knowledgeBase.json`.
   - Integrated into `HepChat.tsx`.

3. **Visuals and Animations**
   - Mood-based visuals in `HepAssistant.tsx`.
   - SVG diagrams in `/assets/iu-playbook/`.

## Testing

- Deploy the site and interact with Hep to verify new features.
- Ensure fetch cards and analogies appear as expected.
