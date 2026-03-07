from datetime import datetime, timezone


def time_ago(dt: datetime) -> str:
    now = datetime.now(timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    diff = now - dt
    seconds = int(diff.total_seconds())

    if seconds < 60:
        return f"{seconds} secs ago" if seconds != 1 else "1 sec ago"

    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes} mins ago" if minutes != 1 else "1 min ago"

    hours = minutes // 60
    if hours < 24:
        return f"{hours} hours ago" if hours != 1 else "1 hour ago"

    days = hours // 24
    if days < 30:
        return f"{days} days ago" if days != 1 else "1 day ago"

    months = days // 30
    if months < 12:
        return f"{months} months ago" if months != 1 else "1 month ago"

    years = days // 365
    return f"{years} years ago" if years != 1 else "1 year ago"


def resolve_priority(priorities, score: float) -> str:
    for p in priorities:
        if score < p.value:
            return p.name
    return priorities[-1].name if priorities else "Unknown"
