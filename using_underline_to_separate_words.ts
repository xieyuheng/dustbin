export function adam_representation(options: {
  learning_rate: number
  relay_factor: number
  decay_rate: number
}): representation_t<[tensor_t, tensor_t, tensor_t]> {
  return {
    inflate: (p) => [p, tensor_zeros(p), tensor_zeros(p)],
    deflate: ([p, ...rest]) => p,
    update: ([p, prev_gradient, learning_ratemodifier], g) => {
      const r = smooth(options.decay_rate, learning_rate_modifier, square(g))
      const adaptive_learning_rate = div(
        options.learning_rate,
        add(stabilizer, square_root(r)),
      )
      const new_g = smooth(options.relay_factor, prev_gradient, g)
      return [sub(p, mul(adaptive_learning_rate, new_g)), new_g, r]
    },
  }
}
