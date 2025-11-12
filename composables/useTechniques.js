export const useTechniques = () => {
  const allTechniquesData = {
    'breathing': {
      id: 'breathing',
      icon: 'ph:wind-fill',
      iconColor: 'text-cyan-600',
      tags: ['high-anxiety', 'short-time']
    },
    'grounding': {
      id: 'grounding',
      icon: 'ph:anchor-simple-fill',
      iconColor: 'text-green-600',
      tags: ['high-anxiety', 'short-time']
    },
    'guided-breathing': {
      id: 'guidedBreathing',
      icon: 'ph:timer-fill',
      iconColor: 'text-blue-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'progressive-muscle-relaxation': {
      id: 'progressiveMuscleRelaxation',
      icon: 'ph:person-arms-spread-fill',
      iconColor: 'text-purple-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'peaceful-visualization': {
      id: 'peacefulVisualization',
      icon: 'material-symbols:landscape',
      iconColor: 'text-green-600',
      tags: ['moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'thought-labeling': {
      id: 'thoughtLabeling',
      icon: 'ph:brain-fill',
      iconColor: 'text-indigo-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'stress-relief-bubbles': {
      id: 'stressReliefBubbles',
      icon: 'ph:circles-four-fill',
      iconColor: 'text-teal-600',
      tags: ['high-anxiety', 'short-time']
    },
    'fidget-spinner': {
      id: 'fidgetSpinner',
      icon: 'ph:spinner-gap',
      iconColor: 'text-lime-600',
      tags: ['high-anxiety', 'short-time'],
      isNew: true
    },
    'sound-therapy': {
      id: 'soundTherapy',
      icon: 'ph:waveform-fill',
      iconColor: 'text-indigo-600',
      tags: ['moderate-anxiety', 'medium-time', 'long-time']
    },
    'stress-ball': {
      id: 'stressBall',
      icon: 'ph:circle-fill',
      iconColor: 'text-orange-600',
      tags: ['high-anxiety', 'short-time']
    },
    'superhero-breathing': {
      id: 'superheroBreathing',
      icon: 'ph:mask-fill',
      iconColor: 'text-red-600',
      tags: ['kids', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'scavenger-hunt-grounding': {
      id: 'scavengerHuntGrounding',
      icon: 'ph:magnifying-glass-fill',
      iconColor: 'text-green-600',
      tags: ['kids', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'calm-down-jar': {
      id: 'calmDownJar',
      icon: 'ph:jar-fill',
      iconColor: 'text-purple-600',
      tags: ['kids', 'moderate-anxiety', 'short-time'],
      isNew: true
    },
    'worry-monster': {
      id: 'worryMonster',
      icon: 'ph:ghost-fill',
      iconColor: 'text-orange-600',
      tags: ['kids', 'moderate-anxiety', 'short-time'],
      isNew: true
    },
    'magic-bubble-breathing': {
      id: 'magicBubbleBreathing',
      icon: 'ph:circle-dashed-fill',
      iconColor: 'text-cyan-600',
      tags: ['kids', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'test-anxiety-reset': {
      id: 'testAnxietyReset',
      icon: 'ph:notebook-fill',
      iconColor: 'text-blue-600',
      tags: ['teens', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'social-anxiety-grounding': {
      id: 'socialAnxietyGrounding',
      icon: 'ph:users-fill',
      iconColor: 'text-indigo-600',
      tags: ['teens', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'performance-anxiety-prep': {
      id: 'performanceAnxietyPrep',
      icon: 'ph:microphone-stage-fill',
      iconColor: 'text-pink-600',
      tags: ['teens', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'teens-body-scan': {
      id: 'teensBodyScan',
      icon: 'ph:person-fill',
      iconColor: 'text-indigo-600',
      tags: ['teens', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'future-worry-time': {
      id: 'futureWorryTime',
      icon: 'ph:clock-fill',
      iconColor: 'text-amber-600',
      tags: ['teens', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'ocd-thought-labeling': {
      id: 'ocdThoughtLabeling',
      icon: 'ph:tag-fill',
      iconColor: 'text-teal-600',
      tags: ['ocd', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'compulsion-delay': {
      id: 'compulsionDelay',
      icon: 'ph:timer-fill',
      iconColor: 'text-violet-600',
      tags: ['ocd', 'high-anxiety', 'short-time', 'medium-time'],
      isNew: true
    },
    'uncertainty-tolerance': {
      id: 'uncertaintyTolerance',
      icon: 'ph:question-mark-fill',
      iconColor: 'text-slate-600',
      tags: ['ocd', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'ocd-mindfulness': {
      id: 'ocdMindfulness',
      icon: 'ph:leaf-fill',
      iconColor: 'text-emerald-600',
      tags: ['ocd', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'nausea-management': {
      id: 'nauseaManagement',
      icon: 'ph:heart-fill',
      iconColor: 'text-rose-600',
      tags: ['emetophobia', 'high-anxiety', 'short-time'],
      isNew: true
    },
    'sensation-labeling': {
      id: 'sensationLabeling',
      icon: 'ph:target-fill',
      iconColor: 'text-pink-600',
      tags: ['emetophobia', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'safe-foods-visualization': {
      id: 'safeFoodsVisualization',
      icon: 'ph:apple-logo-fill',
      iconColor: 'text-green-600',
      tags: ['emetophobia', 'moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'coping-cards': {
      id: 'copingCards',
      icon: 'ph:cards-fill',
      iconColor: 'text-indigo-600',
      tags: ['all', 'moderate-anxiety', 'short-time'],
      isNew: true
    },
    'interactive-art': {
      id: 'interactiveArt',
      icon: 'ph:palette-fill',
      iconColor: 'text-purple-600',
      tags: ['high-anxiety', 'short-time', 'moderate-anxiety'],
      isNew: true
    }
  }

  const allTechniques = computed(() => Object.values(allTechniquesData))

  const getTechnique = (id) => allTechniquesData[id]

  const getRelatedTechniques = (currentId, limit = 3) => {
    const current = allTechniquesData[currentId]
    if (!current) return []

    const others = Object.entries(allTechniquesData)
      .filter(([key, t]) => key !== currentId)
      .map(([key, t]) => t)

    // Score techniques by tag overlap
    const scored = others.map(technique => {
      const sharedTags = technique.tags.filter(tag => current.tags.includes(tag))
      return { technique, score: sharedTags.length }
    })

    // Sort by score and return top techniques
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.technique)
  }

  const getTechniqueRoute = (technique) => {
    return `/${technique.id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
  }

  // Filter techniques by category/tags
  const filterTechniques = (filter = 'all') => {
    if (filter === 'all') {
      return allTechniques.value
    }
    
    return allTechniques.value.filter(technique => {
      return technique.tags.includes(filter)
    })
  }

  // Get available filter categories
  const getFilterCategories = () => {
    const categories = new Set(['all'])
    allTechniques.value.forEach(technique => {
      if (technique.tags.includes('kids')) categories.add('kids')
      if (technique.tags.includes('teens')) categories.add('teens')
      if (technique.tags.includes('ocd')) categories.add('ocd')
      if (technique.tags.includes('emetophobia')) categories.add('emetophobia')
    })
    return Array.from(categories)
  }

  return {
    allTechniques,
    getTechnique,
    getRelatedTechniques,
    getTechniqueRoute,
    filterTechniques,
    getFilterCategories
  }
}
