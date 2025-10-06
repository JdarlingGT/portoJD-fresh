# Hep AI Assistant

## Overview

Hep is the digital studio assistant, inspired by Coach Terry Hoeppner. This guide explains how to update Hep's knowledge base, upload the GPT manifest, and test the assistants.

## Updating the Knowledge Base

1. Navigate to `src/data/knowledgeBase.json`.
2. Update the JSON content with new identity, philosophy, trivia, analogies, or quotes.
3. Save the file to apply changes.

## Uploading the GPT Manifest

1. Locate the file at `/ai/manifest/hep_gpt_manifest.json`.
2. Use the GPT Builder interface to upload the manifest.
3. Ensure the manifest reflects the latest knowledge and personality settings.

## Testing the Assistants

### Vercel Site

1. Deploy the site on Vercel.
2. Interact with Hep on the site to ensure responses align with the knowledge base.
3. Verify the "Coach Hep Legacy Mode" and "crazyBoy" Easter egg functionality.

### GPT Version

1. Use the GPT Builder to test interactions.
2. Confirm that the assistant uses the knowledge base for responses.
3. Check for IU trivia, motivational quotes, and enthusiasm detection.

## Additional Features

- Emotional animation sync for "Nap Mode", "Coach Mode", and "Crazy Boy Mode".
- Speech synthesis for "Coach Hep quotes" using browser TTS.
