import threading
import time
from collections import defaultdict, deque


class RateLimiter:
    """At most `count` requests per `window` seconds per key. In memory, per process."""

    def __init__(self, count: int, window: int):
        self.count = count
        self.window = window
        self.hits: dict[str, deque] = defaultdict(deque)
        self.lock = threading.Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self.lock:
            q = self.hits[key]
            while q and now - q[0] > self.window:
                q.popleft()
            if len(q) >= self.count:
                return False
            q.append(now)
            return True
