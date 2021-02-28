import escpos from 'escpos'
escpos.USB = require('escpos-usb')

console.log('printing')

try {
  const device = new escpos.USB()
  const printer = new escpos.Printer(device)

  if (process.argv[2]) {
    console.log('printing ' + process.argv[2])
    device.open((err) => {
      printer
        .align('LT')
        .style('NORMAL')
        .text(process.argv[2])
        .close()
    })
  } else {
    console.log('printing greeting')
    device.open((err) => {
      printer
        .align('CT')
        .style('B')
        .text('Hallo Mensch,')
        .text('Maschine hier!')
        .drawLine()
        .feed(1)
        .close()
    })
  }
} catch (err) {
  console.error(new Error(err).message)
}