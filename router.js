async function calculatePrice() {
    const tokens = document.getElementById('tokenAmount').value;
    if (tokens && tokens > 0 && contract) {
        try {
            const priceInWei = await contract.getCurrentPrice();
            const priceInEth = parseFloat(ethers.utils.formatEther(priceInWei));
            const total = tokens * priceInEth;
            
            let alertHTML = `Total a pagar: ${total.toFixed(4)} Moneda Nativa`;
            
            // Lógica de alertas dinámicas según el precio devuelto por el contrato
            if (priceInEth >= 5000) {
                alertHTML += `<br><span class="alert-price" style="color: #d32f2f; font-size: 16px;">🚨 ¡ALERTA CRÍTICA! Liquidación extrema de inventario (Falta menos de 1M de tokens). Precio fijado en 5,000 por unidad.</span>`;
            } else if (priceInEth > 0.01) {
                alertHTML += `<br><span class="alert-price" style="color: #f57c00;">⚠️ ¡Alerta! Precio incrementado por escasez (+2000%). Faltan menos de 5M de tokens.</span>`;
            }
            
            document.getElementById('priceCalc').innerHTML = alertHTML;
        } catch(e) {
            console.error("Error al calcular precio:", e);
        }
    } else {
        document.getElementById('priceCalc').innerText = `Total a pagar: 0.00 Moneda Nativa`;
    }
}
