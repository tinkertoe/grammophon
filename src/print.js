escpos = require('escpos')
escpos.USB = require('escpos-usb')

try {
  const device = new escpos.USB()
  const printer = new escpos.Printer(device)

  if (process.argv[2]) {
    device.open((err) => {
      printer
        .align('LT')
        .style('NORMAL')
        .text(process.argv[2])
        .close()
    })
  } else {
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