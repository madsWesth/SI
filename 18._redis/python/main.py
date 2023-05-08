import redis

r = redis.Redis(host='localhost', port=6379, db=0)

r.set('python:foo', 'bar')

value = r.get('python:foo')

print(value)