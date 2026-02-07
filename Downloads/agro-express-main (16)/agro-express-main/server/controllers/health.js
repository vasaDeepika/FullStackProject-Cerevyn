const getApiHealths = async (req, res)=>{
        res.status(200).json({ 
            status: "Health is OK"
        })
}

export {getApiHealths};