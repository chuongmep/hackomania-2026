def resolve_priority(priorities, score: float) -> str:
    for p in priorities:
        if score < p.value:
            return p.name
    return priorities[-1].name if priorities else "Unknown"
