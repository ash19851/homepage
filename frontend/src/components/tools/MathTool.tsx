import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MathTool.module.css'

function safeEval(expr: string): string {
  const sanitized = expr.replace(/[^0-9+\-*/().%^&\s]|Math\.\w+|PI|E/g, '')
  try {
    const result = new Function(`return (${sanitized})`)()
    if (typeof result !== 'number' || !isFinite(result)) return 'Error'
    return String(Number(result.toPrecision(12)))
  } catch {
    return 'Error'
  }
}

const MATH_FNS: { label: string; insert: string; desc: string }[] = [
  { label: 'sqrt', insert: 'Math.sqrt(', desc: '平方根' },
  { label: 'pow', insert: 'Math.pow(', desc: '幂运算' },
  { label: 'sin', insert: 'Math.sin(', desc: '正弦 (弧度)' },
  { label: 'cos', insert: 'Math.cos(', desc: '余弦 (弧度)' },
  { label: 'tan', insert: 'Math.tan(', desc: '正切 (弧度)' },
  { label: 'log', insert: 'Math.log(', desc: '自然对数' },
  { label: 'log10', insert: 'Math.log10(', desc: '以10为底' },
  { label: 'abs', insert: 'Math.abs(', desc: '绝对值' },
  { label: 'ceil', insert: 'Math.ceil(', desc: '向上取整' },
  { label: 'floor', insert: 'Math.floor(', desc: '向下取整' },
  { label: 'round', insert: 'Math.round(', desc: '四舍五入' },
  { label: 'PI', insert: 'Math.PI', desc: '圆周率 π' },
  { label: 'E', insert: 'Math.E', desc: '自然常数 e' },
]

export function MathTool() {
  const [expr, setExpr] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([])

  const evaluate = () => {
    if (!expr.trim()) return
    const res = safeEval(expr)
    setResult(res)
    setHistory((h) => [{ expr, result: res }, ...h].slice(0, 20))
  }

  return (
    <motion.div className={styles.math} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className={styles.inputRow}>
        <motion.input
          className={styles.input}
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') evaluate() }}
          placeholder="输入数学表达式, 如 2 + 3 * 4 或 Math.sqrt(16)"
          whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
        />
        <motion.button className={styles.btn} onClick={evaluate}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
          计算
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div className={styles.result}
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            <span className={styles.resultLabel}>结果:</span>
            <motion.span className={styles.resultValue}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}>
              {result}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.fnGrid}>
        {MATH_FNS.map((fn, i) => (
          <motion.button
            key={fn.label}
            className={styles.fnBtn}
            onClick={() => setExpr((prev) => prev + fn.insert)}
            title={fn.desc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.1, backgroundColor: 'var(--color-accent)', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
          >
            {fn.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {history.length > 0 && (
          <motion.div className={styles.history}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
            <h4>历史记录</h4>
            {history.map((h, i) => (
              <motion.div key={i} className={styles.historyItem}
                onClick={() => setExpr(h.expr)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--color-surface)' }}>
                <span className={styles.historyExpr}>{h.expr}</span>
                <span className={styles.historyResult}>= {h.result}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
