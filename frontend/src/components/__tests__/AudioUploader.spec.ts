import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AudioUploader from '../AudioUploader.vue'

describe('AudioUploader', () => {
  it('renders the upload prompt and not-implemented notice', () => {
    const wrapper = mount(AudioUploader)
    expect(wrapper.text()).toContain('Drag and drop a violin recording')
    expect(wrapper.text()).toContain('Analysis functionality is not implemented yet.')
  })

  it('emits file-selected when a file is chosen', async () => {
    const wrapper = mount(AudioUploader)
    const file = new File(['audio-bytes'], 'sample.wav', { type: 'audio/wav' })
    const input = wrapper.find('input[type="file"]')

    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')

    expect(wrapper.emitted('file-selected')?.[0]).toEqual([file])
    expect(wrapper.text()).toContain('sample.wav')
  })
})
