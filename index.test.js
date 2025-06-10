import Array            from '@superhero/array'
import contextualAssert from '@superhero/audit/assert/contextual'
import { suite, test }  from 'node:test'

suite('@superhero/array', () =>
{
  test('should format a list using conjunction', () => 
  {
    const 
      list   = new Array('apple', 'orange', 'banana'),
      output = list.conjunction(),
      assert = contextualAssert({ list })

    assert.strictEqual(output, 'apple, orange and banana')
  })

  test('should format a list using disjunction', () => 
  {
    const 
      list   = new Array('apple', 'orange', 'banana'),
      output = list.disjunction(),
      assert = contextualAssert({ list })
    
    assert.strictEqual(output, 'apple, orange or banana')
  })

  test('should set configuration for "locale" affecting the formatters', () => 
  {
    const list = new Array('one', 'two', 'three')

    list.locale = 'es'

    const
      output = list.conjunction(),
      assert = contextualAssert({ list })

    assert.strictEqual(output, 'one, two y three')
  })

  test('should return correct last item with and without offset', () => 
  {
    const 
      list   = new Array('a', 'b', 'c'),
      assert = contextualAssert({ list })

    assert.equal(list.last(), 'c')
    assert.equal(list.last(1), 'b')
  })

  test('should compute intersection correctly', () => 
  {
    const 
      list   = new Array('a', 'b', 'c'),
      assert = contextualAssert({ list }),
      result = list.intersection(['b', 'c', 'd'], ['c', 'b'])

    assert.deepEqual(result, ['b', 'c'])
  })

  test('should throw error if non-array passed to intersection', () => 
  {
    const 
      list   = new Array(1, 2, 3),
      assert = contextualAssert({ list })

    assert.throws(() => list.intersection('not-an-array'), 
    {
      code: 'E_ARRAY_INTERSECTION_INVALID_ARGUMENT'
    })
  })

  test('should compute xor correctly', () => 
  {
    const 
      list   = new Array('a', 'b', 'c'),
      assert = contextualAssert({ list }),
      result = list.xor(['b', 'x'], ['c', 'y'])

    assert.deepEqual(result, ['a', 'x', 'y'])
  })

  test('should throw error if non-array passed to xor', () => 
  {
    const 
      list   = new Array('a'),
      assert = contextualAssert({ list })

    assert.throws(() => list.xor('invalid'), 
    {
      code: 'E_ARRAY_XOR_INVALID_ARGUMENT'
    })
  })

  test('should return unique values', () => 
  {
    const 
      list   = new Array('a', 'b', 'a'),
      assert = contextualAssert({ list }),
      result = list.unique(['b', 'c', 'c'])

    assert.deepEqual(result, ['a', 'b', 'c'])
  })

  test('should throw error if non-array passed to unique', () => 
  {
    const 
      list   = new Array('a'),
      assert = contextualAssert({ list })

    assert.throws(() => list.unique('bad'), 
    {
      code: 'E_ARRAY_UNIQUE_INVALID_ARGUMENT'
    })
  })

  test('normalize should wrap single values into array', () => 
  {
    const 
      list   = Array.normalize('value'),
      assert = contextualAssert({ list })

    assert.instanceof(list, Array)
    assert.deepEqual(list, ['value'])
  })

  test('normalize should return instance unchanged', () =>
  {
    const
      list   = new Array('x'),
      assert = contextualAssert({ list })

    assert.strictEqual(Array.normalize(list), list)
  })

  test('normalize should convert plain array into instance', () =>
  {
    const
      list   = Array.normalize(['x', 'y']),
      assert = contextualAssert({ list })

    assert.instanceof(list, Array)
    assert.deepEqual(list, ['x', 'y'])
  })
})